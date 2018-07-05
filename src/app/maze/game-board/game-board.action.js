import { createUpdateAction } from 'utils/action-creator'
import { UPDATE_MAZE } from 'store/action-constants'

export const doActionOnTile = tile => createUpdateAction(UPDATE_MAZE, tile)
