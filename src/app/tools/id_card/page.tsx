"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
    const [name, setName] = useState("徐可");
    const [studentId, setStudentId] = useState("2431181");
    const [department, setDepartment] = useState("经济与管理学院");
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">校园卡模拟器</h1>
            
            <div className="flex flex-col md:flex-row gap-8">
                {/* Campus Card Preview */}
                <div className="flex-1">
                    <Card
                        className="w-[85.6mm] h-[54mm] mx-auto overflow-hidden"
                    >
                        <div className="relative w-full h-full bg-emerald-500">
                            {/* University Logo at top right */}
                            <div className="absolute top-2 right-2 flex items-center gap-1">
                                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                    <span className="text-emerald-600 font-bold text-xs">TJ</span>
                                </div>
                                <span className="text-white text-sm">同济大学</span>
                            </div>
                            
                            {/* Main content */}
                            <div className="absolute bottom-0 left-0 w-full p-2 bg-gradient-to-t from-emerald-700 to-transparent">
                                <div className="flex items-end gap-2">
                                    {/* Photo placeholder */}
                                    <div className="w-16 h-20 bg-gray-200 border-2 border-white">
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            照片
                                        </div>
                                    </div>
                                    
                                    {/* Student info */}
                                    <div className="text-white">
                                        <h3 className="text-md font-bold">{name}</h3>
                                        <p className="text-xs opacity-90">{studentId}</p>
                                        <p className="text-xs opacity-90">{department}</p>
                                    </div>
                                </div>
                            </div>
                            
                            {/* University stone landmark */}
                            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-4">
                                <div className="bg-white bg-opacity-20 px-2 py-1 rounded-sm text-white text-center">
                                    <span className="text-md font-bold">同济大学</span>
                                </div>
                            </div>
                            
                            {/* Card chip */}
                            <div className="absolute left-2 top-2">
                                <div className="w-6 h-4 bg-yellow-400 rounded-sm"></div>
                            </div>
                        </div>
                        
                        {/* Card bottom section */}
                        <div className="p-1 bg-white">
                            <div className="flex justify-between items-center">
                                <span className="text-[8px] text-gray-600">校园一卡通</span>
                                <span className="text-[8px] text-gray-600">TONGJI UNIVERSITY</span>
                            </div>
                        </div>
                    </Card>
                </div>
                
                {/* Edit Form */}
                <div className="flex-1">
                    <Card className="p-6">
                        <h2 className="text-xl font-semibold mb-4">卡片信息</h2>
                        
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="name">姓名</Label>
                                <Input 
                                    id="name" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="请输入姓名"
                                />
                            </div>
                            
                            <div>
                                <Label htmlFor="studentId">学号</Label>
                                <Input 
                                    id="studentId" 
                                    value={studentId}
                                    onChange={(e) => setStudentId(e.target.value)}
                                    placeholder="请输入学号"
                                />
                            </div>
                            
                            <div>
                                <Label htmlFor="department">学院</Label>
                                <Input 
                                    id="department" 
                                    value={department}
                                    onChange={(e) => setDepartment(e.target.value)}
                                    placeholder="请输入学院"
                                />
                            </div>
                            
                            <div className="pt-2">
                                <Button 
                                    className="w-full"
                                    onClick={() => setIsEditing(!isEditing)}
                                >
                                    {isEditing ? "保存信息" : "编辑信息"}
                                </Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
