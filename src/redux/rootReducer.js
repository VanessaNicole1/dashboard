import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import mailReducer from './slices/mail';
import initialReducer from './slices/initialProcess';
// import chatReducer from './slices/chat';
// import productReducer from './slices/product';
// import calendarReducer from './slices/calendar';
// import kanbanReducer from './slices/kanban';

// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

export const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  mail: mailReducer,
  initial: initialReducer,
  // chat: chatReducer,
  // calendar: calendarReducer,
  // kanban: kanbanReducer,
  // product: persistReducer(productPersistConfig, productReducer),
});

export default rootReducer;
