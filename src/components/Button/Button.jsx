import style from './Button.module.scss';

const Button = ({ children, variant = 'primary' }) => {
  return (
    <>
        <button
            className={
                `
                    ${ style.button }
                    ${ style[ variant ] }
                `
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