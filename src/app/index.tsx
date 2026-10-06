import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function RegistroCurso() {
  // 1. Manejo de estados (useState)
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [curso, setCurso] = useState('');
  const [edad, setEdad] = useState('');

  const [error, setError] = useState('');
  const [registrado, setRegistrado] = useState(false);

  // Estado para el modal de cursos desplegable
  const [modalVisible, setModalVisible] = useState(false);

  // Lista de cursos de primaria
  const cursosPrimaria = [
    'Matemáticas',
    'Comunicación',
    'Ciencias Naturales',
    'Personal Social',
    'Arte',
    'Educación Física'
  ];

  // 2. Lógica de Validaciones interactivas
  // Valida que tenga al menos un caracter y solo contenga letras (incluye acentos y ñ) y espacios
  const nombreValido = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre) && nombre.trim().length > 0;
  const correoValido = correo.includes('@');
  const cursoValido = curso.trim().length > 0;
  // Validación de edad: Mínimo 18, Máximo 40
  const edadValida = Number(edad) >= 18 && Number(edad) <= 40 && edad.trim() !== '';

  const validarFormulario = () => {
    setError('');
    setRegistrado(false);

    // Validaciones requeridas
    if (!nombreValido) {
      setError('Ingresa un nombre válido (solo letras y espacios).');
      return;
    }

    if (!correoValido) {
      setError('Ingresa un correo electrónico válido (debe contener un @).');
      return;
    }

    if (!cursoValido) {
      setError('Selecciona un curso de la lista.');
      return;
    }

    if (!edadValida) {
      setError('La edad ingresada no es válida (debe ser entre 18 y 40 años).');
      return;
    }

    // Éxito
    setRegistrado(true);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ENCABEZADO */}
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Text style={styles.headerIconText}>🎒</Text>
          </View>
          <View>
            <Text style={styles.overline}>ACADEMIA PRIMARIA</Text>
            <Text style={styles.title}>Registro de Curso</Text>
          </View>
        </View>

        <Text style={styles.description}>
          Completa los datos del estudiante para inscribirlo en el curso.
        </Text>

        {/* TARJETA DEL FORMULARIO */}
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Datos de Inscripción</Text>
          <Text style={styles.sectionDescription}>Todos los campos son obligatorios.</Text>

          {/* CAMPO: NOMBRE */}
          <Text style={styles.label}>Nombre estudiante</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: Juan Pérez"
            placeholderTextColor="#98A2B3"
            value={nombre}
            onChangeText={(val) => { setNombre(val); setError(''); setRegistrado(false); }}
          />
          {nombre.length > 0 && (
            <Text style={[styles.fieldStatus, nombreValido ? styles.validText : styles.invalidText]}>
              {nombreValido ? '✓ Nombre válido' : '○ Solo letras y espacios permitidos'}
            </Text>
          )}

          {/* CAMPO: CORREO */}
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: juan@correo.com"
            placeholderTextColor="#98A2B3"
            keyboardType="email-address"
            autoCapitalize="none"
            value={correo}
            onChangeText={(val) => { setCorreo(val); setError(''); setRegistrado(false); }}
          />
          {correo.length > 0 && (
            <Text style={[styles.fieldStatus, correoValido ? styles.validText : styles.invalidText]}>
              {correoValido ? '✓ Correo válido' : '○ Debe contener un @'}
            </Text>
          )}

          {/* CAMPO: CURSO (DESPLEGABLE) */}
          <Text style={styles.label}>Curso</Text>
          <TouchableOpacity
            style={[styles.input, { justifyContent: 'center' }]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={{ color: curso ? '#172033' : '#98A2B3' }}>
              {curso ? curso : 'Selecciona un curso...'}
            </Text>
          </TouchableOpacity>
          {curso.length > 0 && (
            <Text style={[styles.fieldStatus, cursoValido ? styles.validText : styles.invalidText]}>
              {cursoValido ? '✓ Curso válido' : '○ Campo obligatorio'}
            </Text>
          )}

          {/* CAMPO: EDAD */}
          <Text style={styles.label}>Edad (18 a 40 años)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej: 20"
            placeholderTextColor="#98A2B3"
            keyboardType="numeric"
            maxLength={2}
            value={edad}
            onChangeText={(val) => { setEdad(val); setError(''); setRegistrado(false); }}
          />
          {edad.length > 0 && (
            <Text style={[styles.fieldStatus, edadValida ? styles.validText : styles.invalidText]}>
              {edadValida ? '✓ Edad válida' : '○ Debe ser entre 18 y 40 años'}
            </Text>
          )}

          {/* 3. MENSAJES CLAROS DE ERROR */}
          {error !== '' && (
            <View style={styles.errorBox}>
              <View style={styles.errorIcon}>
                <Text style={styles.errorIconText}>!</Text>
              </View>
              <View style={styles.messageContainer}>
                <Text style={styles.errorTitle}>No se pudo registrar</Text>
                <Text style={styles.errorMessage}>{error}</Text>
              </View>
            </View>
          )}

          {/* 3. MENSAJES CLAROS DE ÉXITO */}
          {registrado && (
            <View style={styles.successBox}>
              <View style={styles.successIcon}>
                <Text style={styles.successIconText}>✓</Text>
              </View>
              <View style={styles.messageContainer}>
                <Text style={styles.successTitle}>¡Registro Exitoso!</Text>
                <Text style={styles.successMessage}>El estudiante ha sido matriculado en {curso}.</Text>
              </View>
            </View>
          )}

          {/* BOTÓN */}
          <TouchableOpacity style={styles.button} onPress={validarFormulario}>
            <Text style={styles.buttonText}>Registrar Estudiante</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>5. Registro de Curso • Evaluación</Text>
      </ScrollView>

      {/* MODAL DESPLEGABLE DE CURSOS */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona un curso</Text>
            {cursosPrimaria.map((c) => (
              <TouchableOpacity
                key={c}
                style={styles.modalItem}
                onPress={() => {
                  setCurso(c);
                  setModalVisible(false);
                  setError('');
                  setRegistrado(false);
                }}
              >
                <Text style={styles.modalItemText}>{c}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </KeyboardAvoidingView>
  );
}

// 4. INTERFAZ LIMPIA Y ADAPTADA A MÓVIL
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F7FB' },
  scroll: { padding: 20, paddingTop: 45, paddingBottom: 35 },

  // Header
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  headerIcon: { width: 50, height: 50, borderRadius: 16, backgroundColor: '#F59E0B', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  headerIconText: { fontSize: 24 },
  overline: { fontSize: 10, fontWeight: '800', color: '#D97706', letterSpacing: 1.5, marginBottom: 3 },
  title: { fontSize: 26, fontWeight: '800', color: '#172033' },
  description: { fontSize: 14, lineHeight: 21, color: '#667085', marginBottom: 24 },

  // Card & Inputs
  formCard: { backgroundColor: '#FFFFFF', borderRadius: 22, padding: 22, borderWidth: 1, borderColor: '#E8EBF0', marginBottom: 20 },
  sectionTitle: { fontSize: 19, fontWeight: '800', color: '#172033', marginBottom: 4 },
  sectionDescription: { fontSize: 13, color: '#98A2B3', marginBottom: 22 },

  label: { fontSize: 14, fontWeight: 'bold', color: '#344054', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#E8EBF0', borderRadius: 12, padding: 14, marginBottom: 8, color: '#172033', backgroundColor: '#F9FAFB', minHeight: 52 },

  // Validation status
  fieldStatus: { fontSize: 11, fontWeight: '600', marginBottom: 16, marginTop: 2 },
  validText: { color: '#16A34A' },
  invalidText: { color: '#D97706' },

  // Messages
  errorBox: { flexDirection: 'row', backgroundColor: '#FFF5F5', borderRadius: 14, padding: 13, marginBottom: 17, borderWidth: 1, borderColor: '#FECACA' },
  errorIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#FEE2E2', alignItems: 'center', justifyContent: 'center', marginRight: 11 },
  errorIconText: { color: '#DC2626', fontSize: 17, fontWeight: '800' },
  errorTitle: { color: '#991B1B', fontSize: 13, fontWeight: '800', marginBottom: 2 },
  errorMessage: { color: '#B42318', fontSize: 12, lineHeight: 17 },

  successBox: { flexDirection: 'row', backgroundColor: '#F0FDF4', borderRadius: 14, padding: 13, marginBottom: 17, borderWidth: 1, borderColor: '#BBF7D0' },
  successIcon: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#DCFCE7', alignItems: 'center', justifyContent: 'center', marginRight: 11 },
  successIconText: { color: '#16A34A', fontSize: 17, fontWeight: '800' },
  successTitle: { color: '#166534', fontSize: 13, fontWeight: '800', marginBottom: 2 },
  successMessage: { color: '#15803D', fontSize: 12 },

  messageContainer: { flex: 1, justifyContent: 'center' },

  // Button
  button: { backgroundColor: '#F59E0B', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' },

  // Footer
  footer: { textAlign: 'center', fontSize: 12, color: '#98A2B3', marginTop: 10 },

  // Modal Dropdown
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#FFFFFF', borderRadius: 16, width: '85%', padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: '800', color: '#172033', marginBottom: 15, textAlign: 'center' },
  modalItem: { paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F0F2F5' },
  modalItemText: { fontSize: 16, color: '#344054', textAlign: 'center' },
  modalCloseButton: { marginTop: 15, paddingVertical: 14, backgroundColor: '#F3F4F6', borderRadius: 12 },
  modalCloseText: { textAlign: 'center', color: '#344054', fontWeight: 'bold', fontSize: 15 },
});
