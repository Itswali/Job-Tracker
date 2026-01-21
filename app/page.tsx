import { Button } from '@/components/ui/button'
import React from 'react'
import {ArrowRight} from "lucide-react";
import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col bg-white'>
      <main className='flex-1'>
        <section className='container mx-auto px-4 py-32'>
          {/* I set max-w-auto instead of max-w-4xl */}
          <div className='max-auto max-w-auto text-center'>
            <h1 className='text-black mb-6 text-6xl font-bold'>A better way to track your job application.</h1>
            <p className='text-muted-foreground mb-10 text-xl'>
              Capture, organize, and manage your job search in one place.
            </p>
            <div className='flex flex-col items-center gap-4 '>
             <Link href="/sign-up" >
              <Button size={'lg'} className='h-12 px-8 text-lg font-medium'>Start for free <ArrowRight className='ml-2' /></Button>
             </Link>
              <p className='text-sm text-muted-foreground'>Free Forever. No credit card required</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
