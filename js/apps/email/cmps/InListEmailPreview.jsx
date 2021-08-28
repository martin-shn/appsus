import { ToolBar } from './toolbar.jsx';

export function InListEmailPreview({ email, onOpenFull, onReply, onForward, onDelete }) {
    return (
        <React.Fragment>
            <tr>
                <td colSpan='6'>
                    <ToolBar
                        // isIconsOnly='true'
                        onReply={()=> onReply(email.id)}
                        onForward={()=>onForward(email.id)}
                        onDelete={()=>onDelete()}
                        onOpen={() => onOpenFull(email.id)}
                    />
                </td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td colSpan='3'>
                    <div className='InListEmailPreview'>{email.body.substr(0, 200)}</div>
                    {email.body.length > 200 && (
                        <span
                            onClick={() => {
                                onOpenFull(email.id);
                            }}
                        >
                            ... Open full Email
                        </span>
                    )}
                </td>
            </tr>
        </React.Fragment>
    );
}
