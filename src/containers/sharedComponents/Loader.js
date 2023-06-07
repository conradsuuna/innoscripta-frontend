import { BallTriangle } from 'react-loader-spinner'

export const Loader = () => {
    return (
        <div className="loader" style={{ position: 'absolute', top: '50%', left: '60%', transform: 'translate(-50%, -50%)' }}>
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                wrapperClass={{}}
                wrapperStyle=""
                visible={true}
            />
        </div>
    )
};
