export function InListEmailPreview({ email }) {
    return (
        <React.Fragment>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td colSpan='3'>
                    <div className='InListEmailPreview'>{email.body}</div>
                </td>
            </tr>
        </React.Fragment>
    );
}
