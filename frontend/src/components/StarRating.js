import { useUpdateRating } from '../hooks/useUpdateRating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStarHalfStroke, faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

export const StarRating = ({ id, rating }) => {
    const { isLoading, updateRating, } = useUpdateRating();

    return (
        <>
            { rating < 0.5 ? 
            <div>
                <span onClick={() => updateRating(id, 1)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarRegular} />
                </span>
                <span onClick={() => updateRating(id, 2)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarRegular} />
                </span>
                <span onClick={() => updateRating(id, 3)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarRegular} />
                </span>
                <span onClick={() => updateRating(id, 4)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarRegular} />
                </span>
                <span onClick={() => updateRating(id, 5)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarRegular} />
                </span>
            </div> :
            rating > 0 && rating < 1 ?
            <div>
                <span onClick={() => updateRating(id, 1)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarHalfStroke} />
                </span>
                <span onClick={() => updateRating(id, 2)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarRegular} />
                </span>
                <span onClick={() => updateRating(id, 3)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarRegular} />
                </span>
                <span onClick={() => updateRating(id, 4)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarRegular} />
                </span>
                <span onClick={() => updateRating(id, 5)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarRegular} />
                </span>
            </div> :
            rating > 0.5 && rating < 1.5 ?
            <div>
                <span onClick={() => updateRating(id, 1)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarSolid} />
                </span>
                <span onClick={() => updateRating(id, 2)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarRegular} />
                </span>
                <span onClick={() => updateRating(id, 3)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarRegular} />
                </span>
                <span onClick={() => updateRating(id, 4)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarRegular} />
                </span>
                <span onClick={() => updateRating(id, 5)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarRegular} />
                </span>
            </div> :
            rating > 1 && rating < 2 ?
            <div>
                <span onClick={() => updateRating(id, 1)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarSolid} />
                </span>
                <span onClick={() => updateRating(id, 2)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarHalfStroke} />
                </span>
                <span onClick={() => updateRating(id, 3)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarRegular} />
                </span>
                <span onClick={() => updateRating(id, 4)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarRegular} />
                </span>
                <span onClick={() => updateRating(id, 5)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarRegular} />
                </span>
            </div> :
            rating > 1.5 && rating < 2.5 ?
            <div>
                <span onClick={() => updateRating(id, 1)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarSolid} />
                </span>
                <span onClick={() => updateRating(id, 2)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarSolid} />
                </span>
                <span onClick={() => updateRating(id, 3)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarRegular} />
                </span>
                <span onClick={() => updateRating(id, 4)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarRegular} />
                </span>
                <span onClick={() => updateRating(id, 5)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarRegular} />
                </span>
            </div> :
            rating > 2 && rating < 3 ?
            <div>
                <span onClick={() => updateRating(id, 1)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarSolid} />
                </span>
                <span onClick={() => updateRating(id, 2)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarSolid} />
                </span>
                <span onClick={() => updateRating(id, 3)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarHalfStroke} />
                </span>
                <span onClick={() => updateRating(id, 4)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarRegular} />
                </span>
                <span onClick={() => updateRating(id, 5)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarRegular} />
                </span>
            </div> :
            rating > 2.5 && rating < 3.5 ?
            <div>
                <span onClick={() => updateRating(id, 1)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarSolid} />
                </span>
                <span onClick={() => updateRating(id, 2)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarSolid} />
                </span>
                <span onClick={() => updateRating(id, 3)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarSolid} />
                </span>
                <span onClick={() => updateRating(id, 4)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarRegular} />
                </span>
                <span onClick={() => updateRating(id, 5)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarRegular} />
                </span>
            </div> :
            rating > 3 && rating < 4 ?
            <div>
                <span onClick={() => updateRating(id, 1)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarSolid} />
                </span>
                <span onClick={() => updateRating(id, 2)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarSolid} />
                </span>
                <span onClick={() => updateRating(id, 3)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarSolid} />
                </span>
                <span onClick={() => updateRating(id, 4)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarHalfStroke} />
                </span>
                <span onClick={() => updateRating(id, 5)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarRegular} />
                </span>
            </div> :
            rating > 3.5 && rating < 4.5 ?
            <div>
                <span onClick={() => updateRating(id, 1)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarSolid} />
                </span>
                <span onClick={() => updateRating(id, 2)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarSolid} />
                </span>
                <span onClick={() => updateRating(id, 3)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarSolid} />
                </span>
                <span onClick={() => updateRating(id, 4)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarSolid} />
                </span>
                <span onClick={() => updateRating(id, 5)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarRegular} />
                </span>
            </div> :
            rating > 4 && rating < 5 ?
            <div>
                <span onClick={() => updateRating(id, 1)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarSolid} />
                </span>
                <span onClick={() => updateRating(id, 2)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarSolid} />
                </span>
                <span onClick={() => updateRating(id, 3)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarSolid} />
                </span>
                <span onClick={() => updateRating(id, 4)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarSolid} />
                </span>
                <span onClick={() => updateRating(id, 5)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarHalfStroke} />
                </span>
            </div> :
            <div>
                <span onClick={() => updateRating(id, 1)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarSolid} />
                </span>
                <span onClick={() => updateRating(id, 2)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarSolid} />
                </span>
                <span onClick={() => updateRating(id, 3)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarSolid} />
                </span>
                <span onClick={() => updateRating(id, 4)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarSolid} />
                </span>
                <span onClick={() => updateRating(id, 5)} className={isLoading ? "link loading" : "link"}>
                    <FontAwesomeIcon icon={faStarSolid} />
                </span>
            </div>
            
            }
        </>
    );
};