import { RkstConfig } from './rkst'
import { ContentType } from './contentType'

export const defaultConfig: RkstConfig = {
  methods: 'GET',
  url: '',
  headers: {
    'Content-Type': ContentType.URL_ENCODED
  },
  timeOut: 10000,
  allowCode: 200,
  withCredentials: false
}
