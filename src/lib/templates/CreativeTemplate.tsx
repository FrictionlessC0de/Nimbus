import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer"
import { ResumeObject } from "@/types"

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 10, color: "#1a2b4a", padding: "0" },
  headerBg: { backgroundColor: "#1a2b4a", padding: "36 40 24", marginBottom: 0 },
  name: { fontSize: 26, fontFamily: "Helvetica-Bold", color: "#fff", marginBottom: 4 },
  jobTitle: { fontSize: 11, color: "#9FE1CB", marginBottom: 12 },
  contactRow: { flexDirection: "row", gap: 14, fontSize: 9, color: "#aac" },
  accentBar: { backgroundColor: "#1a4b8c", height: 4 },
  body: { padding: "24 40" },
  twoCol: { flexDirection: "row", gap: 24 },
  mainCol: { flex: 2 },
  sideCol: { flex: 1 },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 9, fontFamily: "Helvetica-Bold", color: "#1a4b8c", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 6, borderBottomWidth: 1, borderBottomColor: "#1a4b8c", paddingBottom: 3 },
  entryHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 2 },
  entryTitle: { fontFamily: "Helvetica-Bold", fontSize: 10 },
  entrySubtitle: { fontSize: 9, color: "#555", marginBottom: 3 },
  entryDate: { fontSize: 9, color: "#888" },
  description: { fontSize: 9, color: "#444", lineHeight: 1.5 },
  skill: { fontSize: 9, color: "#1a4b8c", backgroundColor: "#e8f0fb", padding: "3 8", borderRadius: 4, marginBottom: 4 },
})

export default function CreativeTemplate({ resume }: { resume: ResumeObject }) {
  const { personal, experience, education, skills } = resume
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerBg}>
          <Text style={styles.name}>{personal.fullName || "Your Name"}</Text>
          <Text style={styles.jobTitle}>{personal.jobTitle || "Job Title"}</Text>
          <View style={styles.contactRow}>
            {personal.email && <Text>{personal.email}</Text>}
            {personal.phone && <Text>·  {personal.phone}</Text>}
            {personal.location && <Text>·  {personal.location}</Text>}
          </View>
        </View>
        <View style={styles.accentBar} />

        <View style={styles.body}>
          {personal.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Profile</Text>
              <Text style={{ fontSize: 9, color: "#444", lineHeight: 1.6 }}>{personal.summary}</Text>
            </View>
          )}

          <View style={styles.twoCol}>
            <View style={styles.mainCol}>
              {experience.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Experience</Text>
                  {experience.map((exp) => (
                    <View key={exp.id} style={{ marginBottom: 8 }}>
                      <View style={styles.entryHeader}>
                        <Text style={styles.entryTitle}>{exp.jobTitle}</Text>
                        <Text style={styles.entryDate}>{exp.startDate} — {exp.current ? "Present" : exp.endDate}</Text>
                      </View>
                      <Text style={styles.entrySubtitle}>{exp.company}</Text>
                      <Text style={styles.description}>{exp.description}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.sideCol}>
              {skills.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Skills</Text>
                  {skills.map((skill, i) => (
                    <Text key={i} style={styles.skill}>{skill}</Text>
                  ))}
                </View>
              )}

              {education.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Education</Text>
                  {education.map((edu) => (
                    <View key={edu.id} style={{ marginBottom: 6 }}>
                      <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold" }}>{edu.degree}</Text>
                      <Text style={{ fontSize: 9, color: "#555" }}>{edu.institution}</Text>
                      <Text style={{ fontSize: 9, color: "#888" }}>{edu.graduationYear}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}