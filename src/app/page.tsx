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
    <div className="flex flex-col justify-center items-center">
      <CvSectionElement />
    </div>
  );
}
