import { Button } from '../button/button';

export const LoadMore = ({ onClick }) => {
	return (
		<div style={{ display: 'flex', marginTop: '25px', marginBottom: '20px' }}>
			<Button style={{ margin: 'auto' }} variant="secondary" onClick={onClick}>
				Загрузить еще
			</Button>
		</div>
	);
};
