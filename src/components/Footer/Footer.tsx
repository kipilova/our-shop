import { FunctionComponent } from 'react'
import classes from "./footer.module.scss"
import packageJson from '../../../package.json'

export const Footer: FunctionComponent = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={classes.footer} data-cy="footer">
      <ul>
        <li>
          <div className={classes.version}>v.{packageJson.version}</div>
        </li>
      </ul>
    </footer>
  )
}
