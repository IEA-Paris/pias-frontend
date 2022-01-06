export default (document, database) => {
  if (document.dir === '/articles' && document.published) {
    let count = 0
    console.log(document.article_title)
    document.footnotes = []
    document.media = []
    const toc2 = []
    if (document.yt) {
      document.media.push({
        type: 'youtube',
        id: document.yt,
        caption: document.article_title,
      })
    }
    document.body.children = document.body.children.map((child, index) => {
      if (child.value !== '\n') {
        count++
        if (child?.props?.className && child?.props?.className.length && child?.props?.className[0] === 'footnotes') {
          child.children
            .find((node) => node.tag === 'ol')
            .children.map((footnote) => {
              if (footnote.tag === 'li') {
                document.footnotes.push(footnote.children[0].value)
              }
              return true
            })
          return {
            type: 'element',
            tag: 'div',
            props: { class: 'node d-flex' },
            children: [child],
          }
        }
        // make the upgraded toc
        const flag = ['h2', 'h3', 'youtube'].indexOf(child.tag)
        if (flag >= 0) {
          toc2.push({
            depth: flag + 2,
            id: child.props.id || 'youtube_' + index,
            text: document.toc.find((item) => item.id === child.props.id)?.text || child.props.caption,
            isMedia: flag === 2,
          })
        }
        if (flag === 2) {
          document.media.push({
            type: 'youtube',
            id: child.props.yt,
            caption: child.props.caption,
          })
        }
        return {
          type: 'element',
          tag: 'div',
          isHeading: ['h2', 'h3'].includes(child.tag),
          isMedia: ['youtube'].includes(child.tag),
          props: { class: 'node d-flex' },
          children: [
            {
              type: 'element',
              tag: 'a',
              props: {
                class:
                  'text-right index mr-3 ' +
                    [' mt-10', ' mt-6', 'mt-3', 'mt-3', 'mt-5'][
                      ['h2', 'h3', 'p', 'ul', 'youtube'].indexOf(child.tag)
                    ] || '',
                id: count,
                href: '#' + count,
                // TODO addd vuetify goTo instead of link
              },
              children: [{ type: 'text', value: count }],
            },
            ...(flag === 2
              ? [
                  {
                    type: 'element',
                    tag: 'h2',
                    props: {
                      class: '',
                      id: 'youtube_' + index,
                      // TODO addd vuetify goTo instead of link
                    },
                    children: [{ type: 'text', value: ' ' }],
                  },
                ]
              : []),
            {
              type: 'element',
              tag: 'div',
              props: {
                class: [' ', ' ', '', '', 'youtube'][['h2', 'h3', 'p', 'ul', 'youtube'].indexOf(child.tag)],
              },
              children: [child],
            },
          ],
        }
      } else {
        return child
      }
    })
    // replace legacy toc
    document.toc = toc2
    return document
  }
  return document
}
