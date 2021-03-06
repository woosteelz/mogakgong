import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import { Button, Container, CssBaseline, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import CreateArticle from '../components/community/CreateArticle'
import DetailArticle from '../components/community/DetailArticle'

const theme = createTheme();

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
    createData(
        0,
        '16 Mar, 2019',
        'Elvis Presley',
        'Tupelo, MS',
        'VISA ⠀•••• 3719',
        312.44,
    ),
    createData(
        1,
        '16 Mar, 2019',
        'Paul McCartney',
        'London, UK',
        'VISA ⠀•••• 2574',
        866.99,
    ),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
    createData(
        3,
        '16 Mar, 2019',
        'Michael Jackson',
        'Gary, IN',
        'AMEX ⠀•••• 2000',
        654.39,
    ),
    createData(
        4,
        '15 Mar, 2019',
        'Bruce Springsteen',
        'Long Branch, NJ',
        'VISA ⠀•••• 5919',
        212.79,
    ),
];

function preventDefault(event) {
    event.preventDefault();
}

const onClickHandler = (event) => {

}

export default function Community() {
    const [openArticle, setOpenArticle] = useState(null)

    const [openDetail, setOpenDetail] = useState(false);
    const handleDetailOpen = (item) => {
        setOpenDetail(true)
        setOpenArticle(item)
    };
    const handleDetailClose = () => setOpenDetail(false);

    const [openCreate, setOpenCreate] = useState(false)
    const handleCreateOpen = () => setOpenCreate(true);
    const handleCreateClose = () => setOpenDetail(false);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="lg">
                <CssBaseline />
                <Typography variant='h5' sx={{ my: 5 }}>커뮤니티</Typography>
                <Table >
                    <TableHead>
                        <TableRow>
                            <TableCell>글쓴이</TableCell>
                            <TableCell>글 제목</TableCell>
                            <TableCell>작성 날짜</TableCell>
                            <TableCell>댓글 수</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id} onClick={() => handleDetailOpen(row)}>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.shipTo}</TableCell>
                                <TableCell>{row.paymentMethod}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button onClick={handleCreateOpen}>스터디원 모집하러 가기</Button>
                <Modal
                    open={openDetail}
                    onClose={handleDetailClose}>
                    <Box >
                        {openArticle ?
                            <>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    {openArticle.date}
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                                </Typography>
                            </> : null}

                    </Box>
                </Modal>
                <Modal
                    open={openCreate}
                    onClose={handleCreateClose}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Paper sx={{ width: '60%', height: '80%', overflow: 'auto' }}>
                        <CreateArticle />
                    </Paper>
                </Modal>
            </Container>
        </ThemeProvider >
    );
}