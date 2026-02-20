import style from './Button.module.scss';

const Button = ({ children, variant = 'primary', ...props }) => {
  return (
    <>
        <button
            className={
                `
                    ${ style.button }
                    ${ style[ variant ] }
                `
            }
            {
                ...props
            }
        >
            {
                children
            }
        </button>
    </>
  )
}

export default Button