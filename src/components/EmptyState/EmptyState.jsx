import style from './EmptyState.module.scss';

const EmptyState = ({
    icon,
    title,
    message,
    actionText,
    onAction,
}) => {
  return (
    <>
        <div className={style.empty}>
            <div className={style}>
                {
                    icon
                }
            </div>

            <h2> { title } </h2>

            <p> { message } </p>

            {
                actionText && (
                    <button onClick={onAction}>
                        {
                            actionText
                        }
                    </button>
                )
            }
        </div>
    </>
  )
}

export default EmptyState