"use client"
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { File, Loader2Icon, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

function ResumeUploadDialog({ openResumeUpload, setOpenResumeDialog }: any) {

    const [file, setFile] = useState<any>();
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { has } = useAuth();

    useEffect(() => {
        setFile(null)
    }, [openResumeUpload]) // 👈 fixed: was [open], now [openResumeUpload]

    const onFileChange = (event: any) => {
        const file = event.target.files?.[0];
        if (file) {
            console.log(file.name);
            setFile(file);
        }
    }

    const onUploadAndAnalyze = async () => {
        setLoading(true);
        const recordId = uuidv4();
        const formData = new FormData();
        formData.append('recordId', recordId);
        formData.append('resumeFile', file);

        // @ts-ignore
        const hasSubscriptionEnabled = await has({ plan: 'pro' })
        if (!hasSubscriptionEnabled) {
            const resultHistory = await axios.get('/api/history');
            const historyList = resultHistory.data;
            const isPresent = await historyList.find((item: any) => item?.aiAgentType == '/ai-tools/ai-resume-analyzer');
            if (isPresent) {
                router.push('/billing')
                return null;
            }
        }

        const result = await axios.post('/api/ai-resume-agent', formData);
        console.log(result.data)
        setLoading(false);
        router.push('/ai-tools/ai-resume-analyzer/' + recordId);
        setOpenResumeDialog(false);
    }

    return (
        <Dialog open={openResumeUpload} onOpenChange={setOpenResumeDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload resume PDF file</DialogTitle>
                    <DialogDescription>
                        <div>
                            <label htmlFor='resumeUpload' className='flex items-center flex-col 
                            justify-center p-7 border border-dashed 
                            rounded-xl hover:bg-slate-100 cursor-pointer'>
                                <File className='h-10 w-10' />
                                {file ?
                                    <h2 className='mt-3 text-blue-600'>{file?.name}</h2> :
                                    <h2 className='mt-3'>Click here to Upload PDF file</h2>}
                            </label>
                            <input type='file' id='resumeUpload' accept="application/pdf"
                                className='hidden' onChange={onFileChange} />
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant={'outline'}>Cancel</Button>
                    <Button disabled={!file || loading} onClick={onUploadAndAnalyze}>
                        {loading ? <Loader2Icon className='animate-spin' /> : <Sparkles />} Upload & Analyze
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ResumeUploadDialog