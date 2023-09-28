const PercentageBadge = ({percentage, children}) => {
    return (
        <div className="percentage-badge">
            <span className={`colorBadge ${children.toLowerCase()}Percentage`}></span>
            <p>{`${children}: ${percentage}%`}</p>
        </div>
    )
}

export default PercentageBadge