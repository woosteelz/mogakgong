import { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    Chip,
    Select,
    OutlinedInput,
    MenuItem,
    useTheme
} from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, myCategory, theme) {
    return {
        fontWeight:
            myCategory.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export const ProfileDetail = ({ userInfo, setUserInfo }) => {
    const navigate = useNavigate();
    console.log(userInfo)

    // 사용자가 선택한 카테고리 배열
    const [myCategory, setMyCategory] = useState([]);
    const theme = useTheme();

    // 전체 카테고리 배열
    const [categorys, setCategorys] = useState([])

    const handleCategory = (event) => {
        const {
            target: { value },
        } = event;
        setMyCategory(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    // 회원정보 수정
    const submitUserInfo = async (e) => {
        e.preventDefault();

        const editedInfo = {
            ...userInfo,
            memberCategories: myCategory
        }
        await api.put(`/member/${userInfo.id}`, editedInfo, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        })
            .then(res => {
                console.log(editedInfo)
                console.log(res)
                alert('회원정보 수정 완료!')
                navigate("/")
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        api.get('/category', {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then(res => {
            console.log(res)
            setCategorys(res.data.info)
        })
    }, [])

    return (
        <form
            autoComplete="off"
            noValidate
            {...userInfo}
        >
            <Card>
                <CardHeader
                    subheader="이곳에서 회원 정보를 수정합니다"
                    title="회원정보 수정"
                />
                <Divider />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item md={6} xs={12} >
                            <TextField
                                fullWidth
                                label="닉네임"
                                defaultValue={userInfo ? userInfo.nickname : ''}
                                placeholder={userInfo ? userInfo.nickname : ''}
                                onChange={(e) => {
                                    setUserInfo((prev) => {
                                        return {
                                            ...prev,
                                            ninckname: e.target.value
                                        }
                                    })
                                }
                                }
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                            >
                                <DatePicker
                                    fullWidth
                                    label="생년월일"
                                    value={userInfo ? userInfo.birth : ""}
                                    onChange={e => {
                                        setUserInfo((prev) => {
                                            return {
                                                ...prev,
                                                birth: e.toISOString().slice(0, 10)
                                            }
                                        })
                                    }}
                                    renderInput={(params) => <TextField fullWidth {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="당신의 목표를 적어주세요"
                                onChange={e => {
                                    setUserInfo(prev => {
                                        return {
                                            ...prev,
                                            goal: e.target.value
                                        }
                                    })
                                }}
                                defaultValue={userInfo ? userInfo.goal : ''}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Select
                                label="카테고리 설정"
                                fullWidth
                                multiple
                                value={myCategory}
                                onChange={handleCategory}
                                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip key={value} label={value} />
                                        ))}
                                    </Box>
                                )}
                                MenuProps={MenuProps}
                            >
                                {categorys.map((category) => (
                                    <MenuItem
                                        key={category.id}
                                        value={category.name}
                                        style={getStyles(category.name, myCategory, theme)}
                                    >
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2
                    }}
                >
                    <Button
                        fullWidth
                        color="primary"
                        variant="contained"
                        onClick={submitUserInfo}
                        variant="outlined"
                    >
                        저장하기
                    </Button>
                </Box>
            </Card>
        </form>
    );
};