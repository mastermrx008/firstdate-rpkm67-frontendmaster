import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';
import { useGetGroupByToken } from '@/hooks/group/useGetGroupByToken';
import { usePostJoinGroup } from '@/hooks/group/usePostJoinGroup';
import toast from 'react-hot-toast';
import { useDeleteGroupMember } from '@/hooks/group/useDeleteGroupMember';
import { usePostLeaveGroup } from '@/hooks/group/usePostLeaveGroup';
import Modal from '@/components/rpkm/Modal/Modal';
import { useAuth } from '@/context/AuthContext';

interface CodeTextareaProps {
  userId: string;
  userOwnToken: string;
  isPaired: boolean;
  isLeader: boolean;
  memberId: string;
}
const CodeTextarea: React.FC<CodeTextareaProps> = ({
  userId,
  userOwnToken,
  isPaired,
  isLeader,
  memberId,
}) => {
  const [text, setText] = useState('');
  const [inputToken, setInputToken] = useState('');
  const handleTypeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const { resetContext } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const { data: groupData } = useGetGroupByToken(inputToken, openModal);

  const handleOpenModal = () => {
    if (text !== '') {
      if (text === userOwnToken) {
        toast.error('ไม่สามารถจับคู่กับตัวเองได้');
      } else {
        setOpenModal(true);
        setInputToken(text);
        setText('');
      }
    }
  };

  const postJoinGroup = usePostJoinGroup();
  const deleteMember = useDeleteGroupMember();
  const postLeaveGroup = usePostLeaveGroup();
  const handleConfirmPairing = async () => {
    if (isLeader && isPaired) {
      await deleteMember.mutateAsync({
        deleted_user_id: memberId,
        requesting_user_id: userId,
      });
    } else if (isPaired) {
      await postLeaveGroup.mutateAsync(userId);
    }
    setOpenModal(false);
    await postJoinGroup.mutateAsync({
      token: inputToken,
      user_id: userId,
    });
    resetContext();
  };

  return (
    <>
      {}
      <div className="relative gap-1 bg-project-yellow rounded-3xl py-[2%] pl-[6%] pr-[6%] w-4/5 overflow-hidden">
        <textarea
          className="w-[90%] flex hide-scrollbar bg-transparent focus:outline-none font-athiti font-semibold text-project-red whitespace-nowrap placeholder:text-project-red placeholder:text-opacity-50 resize-none"
          rows={1}
          placeholder="โปรดกรอกรหัสห้อง"
          value={text}
          onChange={handleTypeText}
        />

        <button
          className="absolute top-[10%] right-[2%] w-7 h-7 rounded-full p-2 bg-project-cream"
          onClick={handleOpenModal}
        >
          <Icon
            icon="fluent:send-16-filled"
            className="w-full h-full text-project-red"
          />
        </button>
      </div>
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        callBackFunction={handleConfirmPairing}
        variant="blue"
      >
        <span className="flex w-full justify-center text-center text-white font-athiti font-medium text-2xl whitespace-pre-line mx-auto">{`ยินดีจับคู่กับ\n${groupData ? groupData.leader.first_name : 'ชื่อ'} ${groupData ? groupData.leader.last_name : 'สกุล'}`}</span>
      </Modal>
    </>
  );
};

export default CodeTextarea;
