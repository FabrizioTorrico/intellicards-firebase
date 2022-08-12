import styles from '../../styles/Cards.module.scss'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Button,
  Grid,
  Box,
  Text,
  Flex,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import ImageUploader from '../ImageUploader'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useForm, Controller } from 'react-hook-form'
import { createCard } from '../../firebase/firestore'
import MarkDown from '../MarkDown'
import MarkdownInput from '../MarkdownInput'

function CardFace(props) {
  const error = props.errors.front?.message || props.errors.back?.message
  return (
    <FormControl
      id={props.id}
      isInvalid={error}
      hidden={props.id !== props.curFace}
    >
      {props.preview ? (
        <Box pt={16} pb={2} pl={4} h="70vh" overflow={'auto'}>
          <MarkDown>{props.watch(props.id) || 'Nothing here'}</MarkDown>
        </Box>
      ) : (
        <Controller
          name={props.id}
          control={props.control}
          rules={{
            required: `${
              props.id[0].toUpperCase() + props.id.substring(1)
            } is required.`,
          }}
          render={({ field }) => (
            <MarkdownInput value={field.value} onChange={field.onChange} />
          )}
        />
      )}
      <FormErrorMessage mt="-1.5rem">{error}</FormErrorMessage>
    </FormControl>
  )
}

export default function CardForm() {
  const [triggerAnimation, setTriggerAnimation] = useState(false)
  const [curFace, setCurFace] = useState('front')
  const [preview, setPreview] = useState(false)
  const previewStyleText = {
    color: 'main.500',
    borderBottom: '2px solid transparent',
    borderColor: 'main.500',
  }
  const router = useRouter()
  const { deckId } = router.query
  const {
    register,
    handleSubmit,
    setError,
    reset,
    clearErrors,
    watch,
    control,
    formState: { errors },
  } = useForm({
    front: '# Card Title',
    back: '',
  })

  const changeFace = () =>
    setCurFace((curFace) => (curFace === 'front' ? 'back' : 'front'))

  const onSubmit = async (data) => {
    toast
      .promise(createCard(deckId, data), {
        loading: <b>Creating card...</b>,
        success: <b>Card created!</b>,
        error: <b>Could not create.</b>,
      })
      .then(() => {
        reset({ front: '', back: '', type: 'basic' })
      })
      .catch(() => {})
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        position="relative"
        pb={16}
        pt={4}
        px={8}
        h="64vh"
        className={triggerAnimation ? styles.fade_in : ''}
        onAnimationEnd={() => setTriggerAnimation(false)}
      >
        <Flex gap={8} position="absolute" right={'3rem'} top="1rem" zIndex="30">
          <Text
            p={3}
            cursor={'pointer'}
            variant="link"
            {...(!preview ? previewStyleText : {})}
            onClick={() => setPreview(false)}
          >
            {curFace[0].toUpperCase() + curFace.substring(1)} text
          </Text>
          <Text
            p={3}
            cursor={'pointer'}
            variant="link"
            {...(preview ? previewStyleText : {})}
            onClick={() => setPreview(true)}
          >
            Preview
          </Text>
        </Flex>

        {['front', 'back'].map((face) => (
          <CardFace
            key={face}
            errors={errors}
            id={face}
            watch={watch}
            curFace={curFace}
            preview={preview}
            control={control}
          />
        ))}
      </Box>

      {!preview && (
        <Grid mx={8} gap={4} templateColumns={'repeat(4, 1fr)'}>
          <FormControl>
            <FormLabel htmlFor="type">Type: </FormLabel>
            <Select id="type" {...register('type')}>
              <option value="basic">Basic</option>
              <option value="Perfect">Perfect</option>
            </Select>
          </FormControl>
          <FormControl isInvalid={errors.image}>
            <FormLabel htmlFor="image">Image: </FormLabel>
            <ImageUploader setError={setError} clearErrors={clearErrors} />
            <FormErrorMessage>{errors.image?.message}</FormErrorMessage>
          </FormControl>
          {/* <GridItem alignSelf="end" colSpan={2}> */}
          <Button colorScheme="main" alignSelf="end" onClick={changeFace}>
            Show {curFace === 'front' ? 'Back' : 'Front'}
          </Button>
          <Button colorScheme="main" type="submit" alignSelf="end">
            Create
          </Button>
        </Grid>
      )}
    </form>
  )
}
