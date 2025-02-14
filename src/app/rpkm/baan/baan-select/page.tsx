'use client';

import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import home from '@public/baan-select/home.svg';
import search from '@public/baan-select/search.svg';
import '@/components/rpkm/baan/baan-select/style.css';
import { useBaan } from '@/context/BaanContext';
import BaanCard from '@/components/rpkm/BaanCard';
import BaanSelect from '@/components/rpkm/Baan/BaanSelect';
import { BaanInfoProps, baanInfos } from '@/components/rpkm/Baan/baanInfos';
import { BaanSelection } from '@/types/BaanSelection';
import Logo from '@/components/rpkm/Baan/Logo';
import BackToHomeBtn from '@/components/rpkm/BackToHomeBtn';

interface SizeFilterProps {
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  count: number;
}

const calculateSizeFilter = (baan: BaanInfoProps[]): SizeFilterProps[] => {
  const sizeCounts: { [key: string]: number } = {};
  baan.forEach((house) => {
    sizeCounts[house.size] = (sizeCounts[house.size] || 0) + 1;
  });

  return Object.entries(sizeCounts).map(([size, count]) => ({
    size: size as 'S' | 'M' | 'L' | 'XL' | 'XXL',
    count,
  }));
};

const sizeFilter = calculateSizeFilter(baanInfos);

const shuffleArray = (baan: BaanInfoProps[]): BaanInfoProps[] => {
  return [...baan].sort(() => Math.random() - 0.5);
};

const filterArray = (
  selectedBaan: BaanSelection[],
  baan: BaanInfoProps[]
): BaanInfoProps[] => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lookupTable: any = {};
  selectedBaan?.forEach((baan) => {
    lookupTable[baan.baanId] = baan.groupId;
  });
  return baan.filter((b) => !(b.name.en in lookupTable));
};

export default function BaanSelectPage() {
  const [selectedHouseSize, setSelectedHouseSize] = useState<string | null>(
    null
  );
  const [shake, setShake] = useState(false);
  const [shuffledBaan, setShuffledBaan] = useState<BaanInfoProps[]>([]);
  const [searchBaan, setSearchBaan] = useState<string>('');
  const baanListRef = useRef<HTMLDivElement | null>(null);
  const { baanCounts, selectedBaan } = useBaan();

  const handleSizeChange = (size: string) => {
    setSelectedHouseSize((prevSize) => (prevSize === size ? null : size));
  };

  const scrollToBaanList = () => {
    baanListRef.current
      ? baanListRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      : console.error('Element not found.');
    setShake(true);
  };

  useEffect(() => {
    if (!shake) return;
    const handleDocumentClick = () => {
      setShake(false);
    };
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [shake]);

  useEffect(() => {
    let baan = baanInfos;
    if (selectedBaan) {
      baan = filterArray(selectedBaan, baanInfos);
    }
    setShuffledBaan(shuffleArray(baan));
  }, [selectedBaan]);

  const filteredBaan = shuffledBaan.filter(
    (house) =>
      house.name.th.toLowerCase().includes(searchBaan.toLowerCase()) ||
      house.name.en.toLowerCase().includes(searchBaan.toLowerCase())
  );

  return (
    <div className="flex justify-center items-center flex-col">
      <div className="absolute top-20 left-4">
        <BackToHomeBtn />
      </div>
      <Logo />
      <div className="my-3 w-[90vw]">
        <BaanSelect
          mode={'edit'}
          onClick={scrollToBaanList}
        />
      </div>
      <div
        ref={baanListRef}
        className="relative flex justify-center items-center flex-col w-screen"
      >
        <div className="absolute inset-0 bg-rpkm-gray opacity-90"></div>
        <div className="relative flex flex-col items-center mt-4 w-full">
          <div className="flex justify-center items-center mb-1 gap-[4%] w-full">
            <Link href="/rpkm/baan/home">
              <Image
                src={home}
                alt="home"
                className="w-auto h-7 m-2 text-black drop-shadow"
              />
            </Link>
            <div className="relative flex justify-center items-center w-[65%]">
              <input
                type="text"
                placeholder="ค้นหาบ้าน"
                value={searchBaan}
                onChange={(e) => setSearchBaan(e.target.value)}
                className="w-full h-8 pl-4 rounded-full bg-project-yellow placeholder-rpkm-blue"
              />
              <Image
                src={search}
                alt="search"
                className="absolute right-4"
              />
            </div>
          </div>
          <label className="text-white font-semibold mb-2">ขนาดบ้าน</label>
          <div className="flex justify-center items-center flex-wrap mt-1 gap-[6%] w-72">
            {sizeFilter.map((house, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  name="houseSize"
                  className="hidden"
                  id={house.size}
                  checked={selectedHouseSize === house.size}
                  onChange={() => handleSizeChange(house.size)}
                />
                <label
                  htmlFor={house.size}
                  className={cn(
                    `flex justify-center items-center text-white bg-rpkm-green 
                                                                        w-auto h-9 px-4 rounded-lg font-semibold drop-shadow-lg mb-5
                                                                        transition-all duration-300 active:scale-90`,
                    {
                      'bg-white text-rpkm-blue':
                        selectedHouseSize === house.size,
                    }
                  )}
                >
                  {house.size} ({house.count})
                </label>
              </div>
            ))}
          </div>
          <div className="flex justify-center flex-wrap w-full h-80 mb-6 mr-[4%] pl-[3%] gap-4 overflow-y-scroll">
            {filteredBaan
              .filter(
                (house) =>
                  selectedHouseSize === null || house.size === selectedHouseSize
              )
              .map((house, index) => {
                let currentPeople;
                if (baanCounts) {
                  currentPeople =
                    baanCounts.find((b) => b.baanId === house.name.en)?.count ||
                    0;
                } else {
                  currentPeople = 0;
                }
                return (
                  <BaanCard
                    key={index}
                    isShake={shake}
                    currentPeople={currentPeople}
                    {...house}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
