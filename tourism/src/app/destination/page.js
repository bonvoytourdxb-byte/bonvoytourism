// "use client";

// import React from 'react'
import React, { Suspense } from 'react';

import DestinationCTR from '@/containers/destination/DestinationCTR'

function Page() {
    return (
        <>
            <Suspense fallback={<div>Loading destinations...</div>}>
                <DestinationCTR />
            </Suspense>
        </>
    )
}

export default Page
