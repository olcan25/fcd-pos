import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './index'

export const stateChangedPromise = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      resolve(user)
      unsubscribe()
    })
  })
}
