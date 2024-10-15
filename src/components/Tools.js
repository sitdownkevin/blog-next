"use client"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ShinyButton from "@/components/ui/shiny-button";
import { useState, useEffect } from "react";


export function BetterPrompt() {
    const [prompt, setPrompt] = useState(
        {
            role: "",
            requirement: "",
            limits: ["不要产生幻觉"],
        }
    )


    return (
        <div className="flex flex-col justify-center items-center space-y-8 w-full">
            <div className="flex flex-col items-center space-y-2">
                <Button type="button" onClick={() => setPrompt({role: "", requirement: "", limits: ["不要产生幻觉"]})} className="">重置</Button>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 space-y-2">
                <h3>角色</h3>
                <Input type="role" id="role" placeholder="设定角色" value={prompt.role} onChange={(e) => setPrompt({...prompt, role: e.target.value})} />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 space-y-2">
                <h3>要求</h3>
                <Input type="requirement" id="requirement" placeholder="设定要求" value={prompt.requirement} onChange={(e) => setPrompt({...prompt, requirement: e.target.value})} />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 space-y-2">
                <h3>限制</h3>
                {prompt.limits.map((limit, index) => {
                    return (
                        <div key={index} className="flex flex-row space-x-2">
                            <Input type="limit" id="limit" placeholder={`设定限制 ${index+1}`} value={prompt.limits[index]} onChange={(e) => setPrompt({...prompt, limits: [...prompt.limits.slice(0, index), e.target.value,...prompt.limits.slice(index+1)]})} />
                            <ShinyButton type="button" onClick={() => setPrompt({...prompt, limits: [...prompt.limits.slice(0, index),...prompt.limits.slice(index+1)]})} className="w-1/4" >删除</ShinyButton>
                        </div>
                    )
                })}
                <Button type="button" onClick={() => setPrompt({...prompt, limits: [...prompt.limits, ""]})} className="w-full">添加</Button>
            </div>

            <div>
                {JSON.stringify({
                    角色: prompt.role,
                    要求: prompt.requirement,
                    限制: prompt.limits.reverse(),
                }, null, 4)}
            </div>

            <div>
                {`<prompt>
                    <role>${prompt.role}</role>
                    <requirement>${prompt.requirement}</requirement>
                    <limits>
                        ${prompt.limits.reverse().map(limit => `<limit>${limit}</limit>`).join("")}
                    </limits>
                </prompt>`}
            </div>
        </div>
    )
}