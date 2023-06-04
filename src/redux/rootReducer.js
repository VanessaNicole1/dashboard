import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import mailReducer from './slices/mail';
import initialReducer from './slices/initialProcess';
import calendarReducer from './slices/calendar';
// import chatReducer from './slices/chat';
// import productReducer from './slices/product';
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
  calendar: calendarReducer,
  // chat: chatReducer,
  // kanban: kanbanReducer,
  // product: persistReducer(productPersistConfig, productReducer),
});

export default rootReducer;
