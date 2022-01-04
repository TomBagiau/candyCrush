import axios from "axios"
import { useEffect, useState } from "react"

const randomUserNames = [
    'beanspasta',
    'donniedarkotea',
    'pulpfictionfly',
    'asparagusfig',
    'earthriver',
    'cakeelephant',
    'pulpfictionpunch',
    'alligatorbee',
    'ranhurricane',
    'froglastrada',
    'CloudAlpha',
    'MoonStone',
    'styxcomposer',
    'cranberrypie',
    'seapeanuts'
]

const ScoreBoard = ({score}) => {
    const [gameStates, setGameStates] = useState(null)
    const [userName, setUserName] = useState(null)

    const fetchData = async () => {
        const response = await axios.get('http://localhost:8000/scores')
        const data = Object.keys(response.data.data).map(item => response.data.data[item])
        setGameStates(data)
    }

    console.log(gameStates)

    const saveData = () => {
        const data = {
            username: userName,
            score: score
        }

        axios.post('http://localhost:8000/addscore', data)
            .then(response => console.log(response))
            .catch(err => console.log(err))
            .then(fetchData)
    }

    useEffect(() => {
        fetchData()
        setUserName(randomUserNames[Math.floor(Math.random() * randomUserNames.length)])
    }, [])

    const descendingGameStates = gameStates?.sort((a,b) => b.score - a.score)


    return (
        <div className="scoreboard">
            <h1 className="scoreboard_myscore">{userName} : {score}</h1>
            <h2 className="scoreboard_title">Top 3 :</h2>
            {descendingGameStates?.map((gameState, index) => (
                <div key={index}>
                    <p className="scoreboard_classement">{gameState.username}: {gameState.score}</p>
                </div>
            ))}
            <button className="scoreboard_button" onClick={saveData}>Enregistrer le score</button>
        </div>
    )
}

export default ScoreBoard