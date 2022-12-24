import React from 'react'
import classNames from 'classnames'
import './index.css'

const defaultTheme = {
    tower: 'tower',
    towerSelected: 'tower--selected',
    towerDisabled: 'tower--disabled'
}

const colors = ['red', 'yellow', 'green', 'blue', 'indigo', 'violet'];

export interface TowerProps {
    index: number
    isSelected: boolean
    onSelected: (index: number) => void
    rings: Array<number>
}

export const Tower = React.memo<TowerProps>(function Tower({
    index,
    isSelected,
    onSelected,
    rings
}) {
    
    const onLocalClick = React.useCallback<React.MouseEventHandler>((e) => {
        e.stopPropagation()
        onSelected(index)
    } , [index, onSelected])

    const towerClassName = React.useMemo(() => classNames(defaultTheme.tower, {
        [defaultTheme.towerSelected]: isSelected
    }), [isSelected, rings.length])

    return (
        <div className={towerClassName} onClick={onLocalClick}>
            {rings?.map((ring, idx) => {return (
                <div className='ring' style={{ backgroundColor: colors[ring-1], width: `${ring * 13}px`}} key={idx}>
                </div>
            )})}
        </div>
    )
})