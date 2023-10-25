const HistoryEntry = ({historyEntry}) => {

    const { entryType, entryMessage, entryNotes, entryAmmount } = historyEntry;

    return (
        <div>
            <div>
                <p>{entryMessage}</p>
                <p>{entryNotes}</p>
            </div>
            <p>{entryAmmount}</p>
        </div>
    )
}


export default HistoryEntry