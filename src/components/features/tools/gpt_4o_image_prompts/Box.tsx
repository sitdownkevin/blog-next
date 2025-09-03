"use client"

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardCopy, Check } from "lucide-react";
import { toast } from "sonner";

// 定义 Box 组件的属性类型
export type BoxProps = {
    title: string;
    author?: string;
    prompt: string;
    inputImgPath: string;
    outputImgPath: string;
    tags: string[];
};

// Box 组件
export function Box({
    title,
    author,
    prompt,
    inputImgPath,
    outputImgPath,
    tags,
}: BoxProps) {
    // 使用 useState 管理展开/折叠状态、当前显示的图片和复制状态
    const [isExpanded, setIsExpanded] = useState(false);
    const [currentImage, setCurrentImage] = useState("output"); // 'output' is initially on top
    const [isCopied, setIsCopied] = useState(false); // State for copy feedback

    // 切换展开/折叠状态的函数
    const toggleExpanded = () => setIsExpanded(!isExpanded);

    // 切换当前显示的图片的函数
    const toggleImage = () => {
        setCurrentImage(currentImage === "input" ? "output" : "input");
    };

    // 处理图片点击事件
    const handleImageClick = (imageType: 'input' | 'output') => {
        // 点击任何图片都切换
        toggleImage();
    };


    // 处理复制 Prompt 的函数
    const handleCopyPrompt = (e: React.MouseEvent) => {
        e.stopPropagation(); // 阻止事件冒泡到 CardHeader 的 onClick
        navigator.clipboard.writeText(prompt)
            .then(() => {
                setIsCopied(true); // Set copied state to true
                setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
                // toast.success("Prompt copied to clipboard!"); // Remove toast success
            })
            .catch(err => {
                console.error("Failed to copy prompt: ", err);
                toast.error("Failed to copy prompt.");
            });
    };

    // Animation variants for images
    const imageVariants = {
        top: {
            opacity: 1,
            scale: 0.95, // Slightly smaller when on top
            zIndex: 10,
            x: 0,
            y: 0,
            transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } // Smoother cubic-bezier
        },
        bottom: {
            opacity: 0.6, // More subtle opacity for bottom
            scale: 1, // Original size when at bottom
            zIndex: 0,
            x: 16, // Offset slightly
            y: 16,
            transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
        },
    };

    // Animation variants for prompt text
    const promptVariants = {
        collapsed: { height: 20, opacity: 0.8, transition: { duration: 0.3, ease: "easeInOut" } }, // Adjust height for one line
        expanded: { height: "auto", opacity: 1, transition: { duration: 0.3, ease: "easeInOut" } },
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-4" // Add margin bottom for spacing within columns
        >
            <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card border border-border rounded-2xl break-inside-avoid"> {/* Add break-inside-avoid */}
                <CardHeader className="p-4 flex flex-row items-center justify-between"> {/* Use flex to position title and button */}
                    <div className="cursor-pointer" onClick={toggleExpanded}> {/* Wrap title/desc for click */}
                        <CardTitle className="text-lg font-semibold text-card-foreground">{title}</CardTitle>
                        {author && <CardDescription className="text-xs text-muted-foreground pt-1">By {author}</CardDescription>}
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleCopyPrompt}
                        aria-label="Copy prompt"
                        disabled={isCopied} // Optionally disable button briefly after copy
                    >
                        {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <ClipboardCopy className="h-4 w-4" />}
                    </Button>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex flex-col items-center gap-4"> {/* Centered content */}
                    {/* Image Container with Motion */}
                    <div
                        id="image-container"
                        className="relative h-[200px] w-[200px] mb-4" // Reduced size
                    >
                        <AnimatePresence initial={false}>
                            {/* Input Image */}
                            <motion.div
                                key="input"
                                variants={imageVariants}
                                animate={currentImage === 'input' ? 'top' : 'bottom'}
                                className="absolute top-0 left-0 w-full h-full cursor-pointer"
                                onClick={() => handleImageClick('input')}
                            >
                                <Image
                                    src={inputImgPath}
                                    layout="fill" // Use fill layout
                                    objectFit="cover" // Ensure image covers the div
                                    alt="Input Image"
                                    className="rounded-lg" // Keep rounded corners
                                />
                                {currentImage === 'input' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute top-2 left-2 text-white text-xs bg-black bg-opacity-60 px-2 py-1 rounded z-20"
                                    >
                                        Input
                                    </motion.div>
                                )}
                            </motion.div>

                            {/* Output Image */}
                            <motion.div
                                key="output"
                                variants={imageVariants}
                                animate={currentImage === 'output' ? 'top' : 'bottom'}
                                className="absolute top-0 left-0 w-full h-full cursor-pointer"
                                onClick={() => handleImageClick('output')}
                            >
                                <Image
                                    src={outputImgPath}
                                    layout="fill" // Use fill layout
                                    objectFit="cover" // Ensure image covers the div
                                    alt="Output Image"
                                    className="rounded-lg" // Keep rounded corners
                                />
                                {currentImage === 'output' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute top-2 left-2 text-white text-xs bg-black bg-opacity-60 px-2 py-1 rounded z-20"
                                    >
                                        Output
                                    </motion.div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Animated Prompt Section */}
                    <motion.div
                        variants={promptVariants}
                        animate={isExpanded ? "expanded" : "collapsed"}
                        className="w-full text-sm text-muted-foreground overflow-hidden cursor-pointer" // Removed cursor-pointer here
                        // Ensure text wraps and hides correctly
                        onClick={toggleExpanded} // Removed onClick from here, handled by CardHeader wrapper now
                    >
                        {isExpanded ? prompt : `${prompt.substring(0, 50)}...`} {/* Show truncated prompt when collapsed */}
                    </motion.div>
                </CardContent>
                {/* Tags in Footer */}
                {tags && tags.length > 0 && (
                    <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs"> {/* Use Badge component */}
                                {tag}
                            </Badge>
                        ))}
                    </CardFooter>
                )}
            </Card>
        </motion.div>
    );
}