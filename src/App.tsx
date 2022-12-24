import React from 'react'
import { Tower, TowerProps } from './components/Tower'
import './App.css'

const Ws = ['Scrumptious', 'Immaculate', 'Elaborate', 'Dominant']
const DIFFICULTIES = [3, 4, 5, 6, 7]

const fillStart = (n: number) => Array.from({length: n}, (_, i) => i + 1);

const getRandom = (arr: Array<unknown>) => {
  return arr[Math.floor(Math.random() * arr.length)]
}

export default function App() {
  const [difficulty, setDifficulty] = React.useState(3)

  const start = React.useMemo(() => fillStart(difficulty), [difficulty])

  const [towers, setTowers] = React.useState([[...start], [], []])
  const [selected, setSelected] = React.useState(-1)
  const [win, setWin] = React.useState('')

  const reset = React.useCallback(() => {
    setTowers([[...start], [], []])
    setWin('')
    setSelected(-1)
  }, [start])

  const onResetClick = React.useCallback(() => reset(), [])
  const onTowerClick = React.useCallback(() => setSelected(-1), [])
  const onSelected = React.useCallback<TowerProps['onSelected']>(index => {
    if (win) return

    if (selected !== -1) {
      
      if (!(towers[index].length === 0 || towers[selected][0] < towers[index][0])) {
        setSelected(-1)
        return
      }

      const newTowers = [...towers]
      
      const popped = newTowers[selected].shift()

      if (popped === undefined) throw Error

      newTowers[index].unshift(popped)

      setTowers(newTowers)
      setSelected(-1)

    } else if (towers[index].length !== 0) {
      setSelected(index)
    }

  }, [selected, towers, win])

  React.useEffect(() => {
    const lastTower = towers[towers.length - 1]

    if (!win && JSON.stringify(lastTower) === JSON.stringify(start)) {
      setWin(`${getRandom(Ws)} W`)
    }
  }, [towers])

  React.useEffect(() => {
    reset()
  }, [difficulty])

  return (
    <>
      {win && <div>{win}</div>}
      <div className="tower-container" onClick={onTowerClick}>
        {towers.map((rings, idx) =>
          <Tower
            key={idx}
            index={idx}
            isSelected={selected === idx}
            onSelected={onSelected}
            rings={rings}
          />
        )}
      </div>
      <button className='reset-button' onClick={onResetClick}>Reset</button>
      <div className='difficulty'>
        Ring difficulty:
        <div>
        {DIFFICULTIES.map((difficulty) => {

          const onDifficultyClick = React.useCallback(() => setDifficulty(difficulty), [])

          return (
            <button key={difficulty} onClick={onDifficultyClick}>{difficulty}</button>
          )
        })}
        </div>
      </div>
    </>
  )
}
