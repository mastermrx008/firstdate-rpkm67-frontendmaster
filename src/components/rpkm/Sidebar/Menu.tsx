import React from 'react';
// import { Accordion, AccordionItem } from '@nextui-org/accordion';
import Link from 'next/link';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useAuth } from '@/context/AuthContext';
function Menu() {
  const { logout } = useAuth();

  return (
    <div className="w-full h-full text-left  font-medium flex flex-col pb-[5vh]">
      <Link
        href="/rpkm/baan/home"
        className="text-left"
      >
        ลงทะเบียนเลือกบ้าน
      </Link>
      <Link
        href=""
        className="text-left opacity-30"
      >
        ลงทะเบียน Freshy Night
      </Link>
      <div className="w-full h-px bg-black"></div>
      <Link
        href={'/rpkm/activities/map'}
        className="my-2"
      >
        เเผนที่
      </Link>
      <div className="w-full -px-2">
        {/* <Accordion
          selectionMode="multiple"
          className="text-start self-start px-0"
        >
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            title={<div className="py-0">กิจกรรม</div>}
          >
            <div className="flex flex-col w-full justify-items-start text-sm px-xs">
              <Link
                href="/rpkm/activities/"
                className="text-left"
              >
                กิจกรรมในงาน
              </Link>
              <Link
                href="/rpkm/baan/home"
                className="text-left"
              >
                ข้อมูลแต่ละบ้าน
              </Link>
              <Link
                href="/rpkm/activities/"
                className="text-left"
              >
                กิจกรรมชุมชน
              </Link>
              <Link
                href="/rpkm/activities/"
                className="text-left"
              >
                กิจกรรม Walk Rally
              </Link>
            </div>
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Accordion 2"
            title={<div>แผนที่</div>}
          >
            <div className="flex flex-col w-full justify-items-start text-sm px-xs">
              <Link
                href="/"
                className="text-left"
              >
                ข้อมูลที่จัดแต่ละกิจกรรม
              </Link>
              <Link
                href="/rpkm/activities/"
                className="text-left"
              >
                กิจกรรมชุมชน
              </Link>
            </div>
          </AccordionItem>
        </Accordion> */}
      </div>
      <div className="mt-auto">
        <div className="w-full h-px bg-black"></div>
        <Link
          href="/home"
          className="block"
        >
          หน้าหลัก
        </Link>
        <Link
          href=""
          className="opacity-30 blockโ"
        >
          ช่องทางการติดต่อ
        </Link>
        <div className="flex gap-2 mt-2">
          <button onClick={logout}>
            <Icon
              icon="material-symbols:logout"
              className="size-6"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Menu;
