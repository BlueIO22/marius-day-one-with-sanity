import DocumentsPane from 'sanity-plugin-documents-pane'
import {DefaultDocumentNodeResolver} from 'sanity/structure'
import EventCard from '../components/EventCard'

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  switch (schemaType) {
    case 'artist':
      return S.document().views([
        S.view.form(),
        S.view
          .component(DocumentsPane)
          .options({
            query: `*[_type=="event" && references($id)]`,
            params: {id: `_id`},
          })
          .title('Events'),
      ])
    case 'event':
      return S.document().views([
        S.view.form(),
        S.view.component(EventCard).title('Preview Event Card'),
      ])
    default:
      return S.document().views([S.view.form()])
  }
}
