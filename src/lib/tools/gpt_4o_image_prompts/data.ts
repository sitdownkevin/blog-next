import type { BoxProps } from '@/components/tools/gpt_4o_image_prompts/Box'; // Import the type

export const imageData: BoxProps[] = [ // Use the imported type
    {
        title: "Emoji",
        prompt: "Turn the subject in the attached image into a kawaii enamel pin. Use glossy metal outlines and vibrant enamel fill. No extra added features. Square mockup format. White background.",
        inputImgPath: "/figures/gpt_4o_image/input/nh14stYm4o0W2Rbb3rAIjIy8kpAyN0.jpg",
        outputImgPath: "/figures/gpt_4o_image/output/YRUN9gdh3Kh80ScuU3HJyCBPOooRGR.png",
        tags: ["可爱", "珐琅徽章", "金属光泽", "鲜艳色彩", "方形", "白色背景"],
    },
    {
        title: "卡纸风",
        author: "",
        prompt: "根据附图创建一个 emoji 图。 The emoji is handcrafted from colorful cut paper with visible textures, creases, and layered shapes. It casts a soft drop shadow beneath, giving a sense of lightness and depth. The design is minimal, playful, and clean — centered in the frame with lots of negative space. Use soft studio lighting to highlight the paper texture and edges.",
        inputImgPath: "/figures/gpt_4o_image/input/Kl5fZ5cC5E17upYotvhoMTCS0gxzRx.jpg",
        outputImgPath: "/figures/gpt_4o_image/output/Kl5fZ5cC5E17upYotvhoMTCS0gxzRx.png",
        tags: ["Emoji", "剪纸", "纹理", "分层", "简约", "俏皮", "干净", "工作室光照"],
    },
    {
        title: "Vector Icon",
        author: "",
        prompt: "Transform a simple flat vector icon from uploaded pic into a soft, 3D fluffy object. The shape is fully covered in fur, with hyperrealistic hair texture and soft shadows. The object is centered on a clean, light gray background and floats gently in space. The style is surreal, tactile, and modern, evoking a sense of comfort and playfulness. Studio lighting, high-resolution render.",
        inputImgPath: "/figures/gpt_4o_image/input/Kl5fZ5cC5E17upYotvhoMTCS0gxzRx.jpg",
        outputImgPath: "/figures/gpt_4o_image/output/tE7hIxm5c1GeGmKdQIEZvUQuPNjXDB.png",
        tags: ["矢量图标", "3D", "毛绒", "皮毛", "超写实", "超现实", "触感", "现代", "舒适", "俏皮", "工作室光照"],
    },
    {
        title: "微缩场景",
        author: "",
        prompt: `按照以下要求为我生成：

内容：微缩场景，雕塑家们在雕刻 Q版上传图片人物 的巨型雕塑

风格：3D卡通Q版场景插画，1:1画幅，整体风格参考Pixar动画风，人物拥有夸张的大头比例，圆润的大眼睛、软萌的鼻子，脸上带有可爱的表情，整体质感光滑细腻，呈现出玩具般的柔软塑料感。背景为暗色纯色（如纯黑色），采用柔和棚拍光，没有明显阴影，风格干净、温暖、亲和，整体感觉超可爱、现代、数字插画感强烈`,
        inputImgPath: "/figures/gpt_4o_image/input/Kl5fZ5cC5E17upYotvhoMTCS0gxzRx.jpg",
        outputImgPath: "/figures/gpt_4o_image/output/Su7Bc8kpPk6c5WTs16Vd4FVJB8VXdY.png",
        tags: ["微缩场景", "雕塑", "Q版", "3D卡通", "皮克斯风格", "大头娃娃", "玩具感", "暗背景", "棚拍光", "可爱", "现代", "数字插画"],
    },
    {
        title: "3D Character",
        prompt: "Turn the real photo on the right into a stylized 3D character illustration like the character in the left image. Smooth, clay-like textures. Soft lighting with a subtle glow. Friendly and cartoonish expression. High attention to detail and personality.",
        inputImgPath: "/figures/gpt_4o_image/input/Kl5fZ5cC5E17upYotvhoMTCS0gxzRx.jpg",
        outputImgPath: "/figures/gpt_4o_image/output/EHZ7UpqLfUkUewpRasKGcPJFv6ET2i.png",
        tags: ["3D角色", "风格化", "插画", "粘土质感", "柔和光照", "友好", "卡通", "细节", "个性"],
    },
    {
        title: "抽象几何图案",
        prompt: "Turn the subject in the attached image into a kawaii enamel pin. Use glossy metal outlines and vibrant enamel fill. No extra added features. Square mockup format. White background.",
        inputImgPath: "/figures/gpt_4o_image/input/Kl5fZ5cC5E17upYotvhoMTCS0gxzRx.jpg",
        outputImgPath: "/figures/gpt_4o_image/output/hgIYqEhmMcG0O2L5A8zvw3QgJspERg.png",
        tags: ["可爱", "珐琅徽章", "金属光泽", "鲜艳色彩", "方形", "白色背景"], // 与第一个 prompt 相同
    },
];