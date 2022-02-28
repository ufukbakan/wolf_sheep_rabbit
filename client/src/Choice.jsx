import classNames from "classnames"

export default function (props) {

    return (
        <div className={classNames({
            "choice": true,
            "active": props.active
        })} onClick={props.sendChoice.bind(this, props.value)}>
            <img src={props.img}></img>
        </div>
    )
}