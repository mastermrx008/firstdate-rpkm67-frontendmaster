import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";

interface MemberIconProps {
    img_url: string,
    isLeader?: boolean
}
const MemberIcon: React.FC<MemberIconProps> = ({ img_url, isLeader = false }) => {
    return (
        <div className="relative flex flex-col w-full items-center justify-between">
            {
                img_url !== "" ?
                    <Image
                        src={img_url}
                        alt="userPhoto"
                        className="flex w-full h-full object-cover object-center"
                        width={100}
                        height={100}
                    /> :
                    <div className="flex w-full aspect-square rounded-full bg-project-cream items-center justify-center p-4">
                        <Icon
                            icon="mdi:user"
                            className="text-project-light-gray w-full h-full"
                        />
                    </div>
            }
            {
                isLeader &&
                <div className="absolute top-0 left-0 w-1/3 aspect-square bg-project-dark-blue rounded-full p-1">
                    <Icon
                        icon="fa6-solid:crown"
                        className="w-full h-full text-project-yellow"
                    />
                </div>
            }
        </div>
    );
}

export default MemberIcon;