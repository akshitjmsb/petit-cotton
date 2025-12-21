import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { Category } from '../types';
import NavigationDrawer from '../components/NavigationDrawer';

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories: Category[] = [
    { id: '1', name: 'Rompers', count: '12 items', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2OEY8-CKcxUQus87bFyimNTyJochCwOMOGJDuWKMK575xBSt50RfRkpQqx-2DKW_1i57o_fdhnkOCDnj5BiZGCUd1aWD09Q8QcoJNoX0ctPYJ9Jw8h_TepQe0QXGU02xjAra__qOyZCab3-n1z2K7mgpfkfolgOZTkwap6lRTQCKz93aotHnMujrpDLD8CQqmRgVGtIoO0O0_d4_7aG5oOuYUTsH5tymdW3semnH-Lc0_8IGkf4uUI4waz4VFkOFylbB77K6_IQ' },
    { id: '2', name: 'Sleepwear', count: '8 items', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAMb3yq9vwuLTGGVe5NBmPk49nP92H1Fvma5lYN_Ct8AG1nh2rAbkHuOieGHBspvmCzyDbPQRdLyYQZTsZZYlVkHtdQ_e8Xod8QFACN6kZVYMBRE5y8LPqVbmblhh5Y0bB3VQkLxObojn4VYkGTBZdm6W4vZag8zFp7aUWXWTyaP6cuNmpnp2-Yw0mbFEC0ZlBqChciTlcsKt3SojboI5w3QH4RX6bFR_mt0A7-9q_rtOzgzOw8yDHrX750rCyfeyBDkrnye8IgsQ' },
    { id: '3', name: 'Bonnets', count: '5 items', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdJCj1GJ6tveBfLe4MV2Iy4KAwqV180_cth4az5ns9IAOHueejLnaaNzYVIoGiF3-mWiLxcIrYQFzBNWx4aHgVVMWgKZhtuKi3lHYrpZGVw8V8LYMaB0IgysJ1lhZX_A6zKt3RgYkkHDY_7X-Lt5oSUVRpnL-SqNbUdKZQyZLqsU-9nVBxEA1sRLM_l9XRoD2HQrcTs1bM-LPGQchvNWrsCPVNZIzLRI1_HXP8uEw-9PBQC0Rzl2hsTN70vLzWVAkh5GgDMiy6XA' },
    { id: '4', name: 'Booties', count: '9 items', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAv_pAM6P1ZjSMhcjTvgsG6F29tVaQ0j-V_9rkjKPGbJteZK2fTvdQCWBZun1aXUe-CpMch8BfNx-lrSEX_GRUH7z4Hd__HXlotP5UfvOkOAMXCprKDpgGbtyDD-x975_eo66OBx96A7mEl3QN8ms0mpjTzzxIK0lgJ-MinLKwUr8Gw4h6InU94wapg5TXBEMTAmhnFFHXC1-e6izc04wTxTIPbaXvKixhT8b0aE-OXbW6CByDpJswD9yArqi6_06F5_oXe7UVVLA' }
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-bg-light pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 flex items-center bg-bg-light/95 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-100">
        <div
          onClick={() => setIsMenuOpen(true)}
          className="flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-text-main">menu</span>
        </div>
        <h2 className="text-text-main text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center">Melilot Baby</h2>
        <div className="flex items-center gap-1">
          <button
            onClick={() => navigate('/search')}
            className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer text-text-main"
          >
            <span className="material-symbols-outlined shrink-0" style={{ fontSize: '24px' }}>search</span>
          </button>
          <button
            onClick={() => navigate('/cart')}
            className="flex size-12 cursor-pointer items-center justify-center overflow-hidden rounded-full hover:bg-gray-100 transition-colors"
          >
            <span className="material-symbols-outlined text-text-main">shopping_bag</span>
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="w-full bg-bg-light pt-2">
        <div className="flex gap-3 p-3 overflow-x-auto no-scrollbar">
          {['Newborn', '0-3 Months', '3-6 Months', '6-12 Months', 'Gift Sets'].map((tab) => (
            <div key={tab} className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-[#F0F9FF] px-5 cursor-pointer border border-transparent hover:border-primary/50 transition-colors active:scale-95">
              <p className="text-text-main text-sm font-medium leading-normal whitespace-nowrap">{tab}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Banner */}
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-text-main tracking-tight text-[28px] font-bold leading-tight">Hand-stitched Comfort</h2>
        <p className="text-gray-500 text-sm mt-1">Discover our latest organic collection.</p>
      </div>

      <div className="p-4">
        <div className="flex flex-col items-stretch justify-start rounded-xl overflow-hidden shadow-sm bg-white ring-1 ring-gray-100">
          <div
            className="w-full bg-center bg-no-repeat bg-cover aspect-[16/10]"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBD8MiwQ3ak6YufGhUlmuPjO4pNgjesTYKUiBhprLhwQT1S2-juxGbe5-1-heHEORW6fP7BMt6oYaczhQbyId4rmOhkFBfWH4YjuuTatXO7UATWgh7HuFzJI8oNMuUmw4oUelTMl3-Mx2bYmizuCVbjlSn5KstqDqK3T5ZSiFVEzDAiejWesjkO5eal5HaUA1NeZ0UJZAeLfkO9lGobhApcHSAY_iiePpAjDSL1fmydr9nlEAtLN86KD6Bvo3Hc-7slgQEXGN4k6w")' }}
          ></div>
          <div className="flex w-full grow flex-col items-stretch justify-center gap-3 py-5 px-5">
            <div>
              <p className="text-text-main text-xl font-bold leading-tight">New Arrivals</p>
              <p className="text-[#82AEC4] text-base font-normal leading-normal mt-1">Gentle fabrics for sensitive skin.</p>
            </div>
            <div className="flex items-center justify-start pt-2">
              <button
                onClick={() => navigate('/products')}
                className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-primary text-text-main text-sm font-bold leading-normal hover:bg-primary-dark transition-colors active:scale-95 shadow-sm"
              >
                <span className="truncate">Shop Collection</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="pt-4 pb-2 px-4">
        <h3 className="text-text-main tracking-tight text-2xl font-bold leading-tight">Categories</h3>
      </div>
      <div className="grid grid-cols-2 gap-4 px-4 pb-4">
        {categories.map((cat) => (
          <div key={cat.id} onClick={() => navigate('/products')} className="group flex flex-col gap-2 cursor-pointer active:scale-[0.98] transition-transform">
            <div
              className="aspect-[4/5] w-full rounded-xl bg-gray-100 bg-center bg-cover bg-no-repeat relative overflow-hidden"
              style={{ backgroundImage: `url("${cat.image}")` }}
            >
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors"></div>
            </div>
            <div className="flex flex-col">
              <p className="text-base font-bold text-text-main">{cat.name}</p>
              <p className="text-xs text-gray-500">{cat.count}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mx-4 my-6 p-6 rounded-xl bg-[#F0F9FF] flex flex-col items-center text-center gap-3 border border-primary/10">
        <span className="material-symbols-outlined text-[#608CA3] text-3xl">eco</span>
        <h4 className="text-lg font-bold text-text-main">Sustainable &amp; Canadian</h4>
        <p className="text-sm text-gray-600 leading-relaxed max-w-[280px]">
          Hand-stitched in Montreal using the finest organic cotton. Read about our heritage.
        </p>
        <button className="mt-2 text-sm font-bold text-text-main underline decoration-primary decoration-2 underline-offset-4">
          Our Story
        </button>
      </div>

      <BottomNav />

      {/* Navigation Drawer */}
      <NavigationDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
};

export default HomeScreen;