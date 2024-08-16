import { NumberInputProps, useFormValue } from 'sanity'
import { Stack, Text } from '@sanity/ui'
import dayjs from 'dayjs';

function subtractMinutesFromDate(date: string, minutes: number) {
    return new Date(new Date(date).getTime() - minutes * 60000)
}

export function DoorsOpenInput(props: NumberInputProps) {

    const date = useFormValue(["date"]) as string || undefined;

    return (
        <Stack space={3}>
            {props.renderDefault(props)}

            <Text size={1}>
                There will be attempted sold {props.value} tickets on {dayjs(date).format("DD. MMMM - YYYY")}
            </Text>

        </Stack>
    )
}