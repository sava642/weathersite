import { RootState } from '../../../app/reducers';

export const locationSelector = (state: RootState) => ({
	latitude: state.location.latitude,
	longitude: state.location.longitude,
	error: state.location.error
});

