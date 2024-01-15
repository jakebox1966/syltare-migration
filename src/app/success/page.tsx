import * as React from 'react'

export interface ISuccessProps {}

export default function Success(props: ISuccessProps) {
    return (
        <div className="min-w-screen min-h-screen flex flex-col justify-center items-center">
            <div className="w-full max-w-[900px] flex flex-col justify-center items-center">
                <div className='bg-[url("/syltare_main_logo2.png")] bg-no-repeat bg-center bg-cover w-full min-h-[30vh]'></div>
                <div className='bg-[url("/main_logo_text.svg")] bg-no-repeat bg-center bg-contain w-full min-h-[30vh]'></div>

                <div className="border-2 p-32 rounded-xl absolute backdrop-blur-sm text-3xl font-black">
                    지갑 주소를 제출했습니다.
                </div>
            </div>
        </div>
    )
}
