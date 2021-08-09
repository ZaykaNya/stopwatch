import "./Stopwatch.css";
import {useEffect, useState} from "react";
import {interval, Subject} from 'rxjs';
import {takeUntil} from "rxjs/operators";

const Stopwatch = () => {

    const [time, setTime] = useState(0);
    const [on, setOn] = useState(false);
    const [click, setClick] = useState(0);

    useEffect(() => {

        const unsubscribe = new Subject();

        interval(10)
            .pipe(
                takeUntil(unsubscribe)
            )
            .subscribe(() => {
                if (on) {
                    setTime(prevTime => prevTime + 1);
                }
            });

        return () => {
            unsubscribe.next();
            unsubscribe.complete();
        }

    }, [on]);

    const handleStop = () => {
        setOn(false);
        setTime(0);
    }

    const handleWait = () => {
        setClick(prev => prev + 1);

        const timer = setTimeout(() => {
            setClick(0);
        }, 300);

        if (click + 1 === 2) {
            setOn(false);
            setClick(0);
        }

        return () => clearTimeout(timer);
    }

    return (
        <div className="page">
            <div className="container">
                <div>
                    <h1>STOPWATCH</h1>
                </div>
                <div>
                    <h1>
                        <span>{("0" + Math.floor((time / 360000) % 24)).slice(-2)}:</span>
                        <span>{("0" + Math.floor((time / 6000) % 60)).slice(-2)}:</span>
                        <span>{("0" + Math.floor((time / 100) % 60)).slice(-2)}</span>
                    </h1>
                </div>
                <div className="buttons">
                    <button className="button" onClick={() => setOn(true)}>Start</button>
                    <button className="button" onClick={handleStop}>Stop</button>
                    <button className="button" onClick={handleWait}>Wait</button>
                    <button className="button" onClick={() => setTime(0)}>Reset</button>
                </div>
            </div>
        </div>
    );
}

export default Stopwatch;
