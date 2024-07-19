// src/components/Factura.jsx
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 30,
        flexDirection: 'column',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
});

const Factura = ({ invoiceData }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.section}>
                <Text>Invoice</Text>
                <Text>Date: {invoiceData.date}</Text>
                <Text>Client: {invoiceData.clientName}</Text>
                <Text>Amount: ${invoiceData.amount}</Text>
                <Text>Items:</Text>
                {invoiceData.items.map((item, index) => (
                    <Text key={index}>{item.name}: ${item.price.toFixed(2)}</Text>
                ))}
            </View>
        </Page>
    </Document>
);

export default Factura;