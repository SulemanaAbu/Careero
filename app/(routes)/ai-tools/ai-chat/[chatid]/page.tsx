"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { LoaderCircle, Send } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import EmptyState from '../_components/EmptyState'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';
import ReactMarkdown from 'react-markdown'

type Message = {
    content: string,
    role: string,
    type: string
}

function AiChat() {
    const [userInput, setUserInput] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [messageList, setMessageList] = useState<Message[]>([]);
    const { chatid }: any = useParams();
    const router = useRouter();
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatid && GetMessageList();
    }, [chatid])

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messageList, loading])

    const GetMessageList = async () => {
        try {
            const result = await axios.get('/api/history?recordId=' + chatid);
            setMessageList(result?.data?.content ?? []);
        } catch (err) {
            console.error('Failed to load messages:', err);
        }
    }

    const onSend = async () => {
        if (!userInput.trim() || loading) return;

        setLoading(true);
        const currentInput = userInput;

        setMessageList(prev => [...prev, {
            content: currentInput,
            role: 'user',
            type: 'text'
        }]);
        setUserInput('');

        try {
            const result = await axios.post('/api/ai-career-chat-agent', {
                userInput: currentInput
            });
            setMessageList(prev => [...prev, result.data]);
        } catch (err) {
            console.error('Failed to send message:', err);
            setMessageList(prev => [...prev, {
                content: 'Something went wrong. Please try again.',
                role: 'assistant',
                type: 'text'
            }]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (messageList.length > 0) {
            updateMessageList();
        }
    }, [messageList])

    const updateMessageList = async () => {
        try {
            await axios.put('/api/history', {
                content: messageList,
                recordId: chatid
            });
        } catch (err) {
            console.error('Failed to update history:', err);
        }
    }

    const onNewChat = async () => {
        const id = uuidv4();
        try {
            await axios.post('/api/history', {
                recordId: id,
                content: []
            });
            router.replace("/ai-tools/ai-chat/" + id);
        } catch (err) {
            console.error('Failed to create new chat:', err);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') onSend();
    }

    return (
        <div className='px-10 md:px-24 lg:px-36 xl:px-48 h-[75vh]'>
            <div className='flex items-center justify-between gap-8'>
                <div>
                    <h2 className='font-bold text-lg'>AI Career Q/A Chat</h2>
                    <p>Smarter career decisions start here — get tailored advice, real-time market insights</p>
                </div>
                <Button onClick={onNewChat}>+ New Chat</Button>
            </div>

            <div className='flex flex-col h-[70vh]'>
                {messageList?.length === 0 && !loading && (
                    <div className='mt-5'>
                        <EmptyState selectedQuestion={(question: string) => setUserInput(question)} />
                    </div>
                )}

                <div className='flex-1 overflow-auto mt-8 pb-20'>
                    {messageList?.map((message, index) => (
                        <div key={index}>
                            <div className={`flex mb-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`p-3 rounded-lg max-w-[80%] ${message.role === 'user'
                                    ? 'bg-gray-200 text-black'
                                    : 'bg-gray-50 text-black border border-gray-200'
                                    }`}>
                                    {message.role === 'assistant' ? (
                                        <div className="prose prose-sm max-w-none">
                                            <ReactMarkdown>
                                                {message.content}
                                            </ReactMarkdown>
                                        </div>
                                    ) : (
                                        <p>{message.content}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {loading && (
                        <div className='flex justify-start p-3 rounded-lg gap-2 bg-gray-50 text-black mb-2 border border-gray-200'>
                            <LoaderCircle className='animate-spin' /> Thinking...
                        </div>
                    )}

                    <div ref={bottomRef} />
                </div>

                <div className='flex justify-between items-center gap-6 absolute bottom-5 w-[50%]'>
                    <Input
                        placeholder='Type here'
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={loading}
                    />
                    <Button onClick={onSend} disabled={loading || !userInput.trim()}>
                        <Send />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AiChat