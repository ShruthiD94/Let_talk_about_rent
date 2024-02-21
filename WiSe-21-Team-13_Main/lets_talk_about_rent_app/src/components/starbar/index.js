import { AiFillStar } from 'react-icons/ai';

const StarBar = ({amount, maxAmount, size}) => {
    let stars = []
    for (let i = 0; i < maxAmount; i++){
        if (i < amount){
            stars.push(<AiFillStar key={i} size={size}/>)
        }
        else {
            stars.push(<AiFillStar key={i} color={"grey"}size={size}/>)
        }
    }
    return stars;
}

export default StarBar;