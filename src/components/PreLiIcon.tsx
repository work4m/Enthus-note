import { memo } from 'react';
import { IconCircleMinus, IconFolder } from '@tabler/icons-react';

interface PreLiIconProps {
    isDelete?: boolean,
    onDeletePress?: () => void,
    isFirst?: boolean
}

const PreLiIcon = ({ isDelete, onDeletePress, isFirst }: PreLiIconProps) => {

    if (isDelete && !isFirst) {
        return (
            <IconCircleMinus
                className='prelist-folder-icon focus-on'
                size={"18px"}
                stroke={"1.7px"}
                onClick={onDeletePress}
            />
        )
    }

    return (
        <IconFolder
            className='prelist-folder-icon'
            size={"18px"}
            stroke={"1.7px"}
        />
    )
}

export default memo(PreLiIcon);