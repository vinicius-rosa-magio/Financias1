import React, { useState } from 'react';
import { View, Text, Platform, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Container, Header } from './styles';

export default function DatePicker({ date, onChange, onCLose }) {
    const [dateNow, setDateNow] = useState(new Date(date));


    return (
        <Container>
            {Platform.OS === 'ios' && (
                <Header>
                    <TouchableOpacity onPress={(onCLose) => { }}>
                        <Text> Fechar </Text>
                    </TouchableOpacity>
                </Header>
            )}
            <DateTimePicker
                value={dateNow}
                mode='date'
                display='default'
                onChange={(e, d) => {
                    const currentDate = d || dateNow;
                    setDateNow(currentDate);
                    onChange(currentDate);
                }}
                style={{ background: 'white' }}
            />
        </Container>

    );
}