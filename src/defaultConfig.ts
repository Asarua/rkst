import { RkstConfig } from './rkst'
import { Methods } from './methods'
import { ContentType } from './contentType'

export const defaultConfig: RkstConfig = {
  methods: Methods.GET,
  url: '',
  headers: {
    'Content-Type': ContentType.URL_ENCODED
  },
  timeOut: 10000,
  allowCode: 200,
  withCredentials: false
}
