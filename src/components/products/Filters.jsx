import { ButtonGroup, Button, Badge } from 'react-bootstrap';

export default function Filters({ current, onChange, options, total }) {
    const allActive = current === 'all';

    return (
        <ButtonGroup className="flex-wrap mb-3">
            <Button variant={allActive ? 'success' : 'outline-success'} onClick={() => onChange('all')}>
                Todos{' '}
                <Badge bg={allActive ? 'light' : 'success'} text={allActive ? 'dark' : 'light'} className="ms-1">
                    {total}
                </Badge>
            </Button>
            {options.map(opt => {
                const isActive = current === opt;
                return (
                    <Button key={opt} variant={isActive ? 'success' : 'outline-success'} onClick={() => onChange(opt)}>
                        {opt}
                    </Button>
                );
            })}
        </ButtonGroup>
    );
}
