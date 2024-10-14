import Image from 'next/image'


interface LogoProps {
    width?: number;
    height?: number;
}
export const Logo = ({ width = 152, height = 56 }: LogoProps) => {
    return (
        <Image src={"/logo.svg"} height={height} width={width} alt='Logo' />
    )
}
