import { ReactNode } from "react"

type ButtonProps = {
    title: ReactNode,
    bold?: boolean,
    onClick?: () => void
}

const Button = ({
    title,
    bold,
    onClick
}: ButtonProps) => {

    let className = "common-button ";

    if (bold) className = `${className} button-bold`;

    return (
        <button
            className={className}
            onClick={onClick}
        >
            {title}
        </button>
    )
}

export default Button