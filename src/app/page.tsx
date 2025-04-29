import CvSectionElement from "@/components/CV";
import { redirect } from 'next/navigation';

export default function Page() {
  // 生成一个0到1之间的随机数
  // const randomValue = Math.random();

  // // 根据随机数决定重定向或渲染页面
  // if (randomValue < 1/3) {
  //   // 大约 33.3% 的几率重定向到 /resume
  //   redirect('/resume');
  // }

  return (
    // Add the width constraint wrapper div here
    <div className="w-5/6 md:w-2/3 lg:w-1/2 mx-auto">
      <div className="flex flex-col justify-center items-center">
        <CvSectionElement />
      </div>
    </div>
  );
}
