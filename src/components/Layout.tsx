import React from 'react'
import { motion, isValidMotionProp } from 'framer-motion'
import { chakra } from '@chakra-ui/react'

type Props = {
    children: React.ReactNode
}

export const Layout = ({ children }: Props) => {
    return (
        <CustomBox variants={thisVariant} initial="initial" animate="animate" exit="exit" p="2">
            {children}
        </CustomBox>
    )
}

const CustomBox = chakra(motion.div, {
    shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
})

const thisVariant = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: 'easeInOut',
        },
    },
    exit: {
        opacity: 0,
    },
}
